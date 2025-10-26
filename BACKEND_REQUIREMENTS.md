# Backend Requirements for Progress Tracking System

## Overview
The frontend React app now has a complete progress tracking system with visual progress bars and lesson locking functionality. To make this system work fully, the backend needs to provide a specific endpoint.

## Required Backend Endpoint

### GET /api/progress/

**Purpose:** Returns the authenticated user's lesson completion data

**Authentication:** Session-based (credentials: 'include')

**Request Method:** GET

**Expected Response Format:**

```json
{
  "completed_lessons": [1, 2, 3],
  "progress": {
    "1": {
      "score": 100,
      "completed": true,
      "completed_at": "2025-10-25T10:30:00Z"
    },
    "2": {
      "score": 100,
      "completed": true,
      "completed_at": "2025-10-25T11:15:00Z"
    },
    "3": {
      "score": 100,
      "completed": true,
      "completed_at": "2025-10-25T12:00:00Z"
    },
    "4": {
      "score": 0,
      "completed": false
    }
  },
  "total_lessons": 4,
  "progress_percentage": 75
}
```

### Response Fields:

- **completed_lessons** (array): List of lesson IDs that have been completed (e.g., [1, 2, 3])
- **progress** (object): Detailed progress for each lesson (1-4)
  - Each lesson object contains:
    - `score`: The score achieved (0-100)
    - `completed`: Boolean indicating completion status
    - `completed_at`: ISO timestamp when lesson was completed (optional)
- **total_lessons** (number): Total number of lessons (should be 4)
- **progress_percentage** (number): Overall completion percentage (0-100)

### Error Responses:

- **401 Unauthorized**: User is not authenticated
  ```json
  {
    "error": "Not authenticated"
  }
  ```

- **500 Internal Server Error**: Server error
  ```json
  {
    "error": "Internal server error"
  }
  ```

## Implementation Notes

### Database Query
You should query your `Progress` model to:
1. Filter by the authenticated user
2. Get all lessons (1-4) and their completion status
3. Calculate the progress percentage

### Example Django Implementation:

```python
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from .models import Progress

@require_http_methods(["GET"])
def get_progress(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Not authenticated'}, status=401)

    user = request.user
    total_lessons = 4

    # Get all progress records for this user
    progress_records = Progress.objects.filter(user=user, lesson_id__in=[1, 2, 3, 4])

    # Build progress dictionary
    progress = {}
    completed_lessons = []

    for lesson_id in range(1, total_lessons + 1):
        record = progress_records.filter(lesson_id=lesson_id).first()

        if record and record.completed:
            progress[str(lesson_id)] = {
                'score': record.score,
                'completed': True,
                'completed_at': record.completed_at.isoformat() if record.completed_at else None
            }
            completed_lessons.append(lesson_id)
        else:
            progress[str(lesson_id)] = {
                'score': 0,
                'completed': False
            }

    progress_percentage = round((len(completed_lessons) / total_lessons) * 100)

    return JsonResponse({
        'completed_lessons': completed_lessons,
        'progress': progress,
        'total_lessons': total_lessons,
        'progress_percentage': progress_percentage
    })
```

### URL Configuration:

Add to your `urls.py`:
```python
from django.urls import path
from . import views

urlpatterns = [
    # ... existing patterns ...
    path('api/progress/', views.get_progress, name='get_progress'),
]
```

## Existing Backend Integration

The backend already has:
- ✅ POST /api/update-progress/ - Updates lesson progress (already working)
- ✅ Session-based authentication (already working)
- ✅ Progress model with user, lesson_id, score, completed fields

What's needed:
- ❌ GET /api/progress/ - Retrieves user's progress data

## Testing the Endpoint

### Using curl:
```bash
# First login to get session cookie
curl -X POST http://127.0.0.1:8000/api/login/ \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass"}' \
  -c cookies.txt

# Then fetch progress
curl -X GET http://127.0.0.1:8000/api/progress/ \
  -b cookies.txt
```

### Expected Response:
```json
{
  "completed_lessons": [1, 2],
  "progress": {
    "1": {"score": 100, "completed": true, "completed_at": "2025-10-25T10:30:00Z"},
    "2": {"score": 100, "completed": true, "completed_at": "2025-10-25T11:15:00Z"},
    "3": {"score": 0, "completed": false},
    "4": {"score": 0, "completed": false}
  },
  "total_lessons": 4,
  "progress_percentage": 50
}
```

## How the Frontend Uses This Endpoint

1. **On Login:** When a user logs in, the frontend immediately calls GET /api/progress/
2. **Display Progress Bar:** Shows visual progress indicator (e.g., "2/4 lessons completed - 50%")
3. **Lock Lessons:** Lessons must be completed in order (1→2→3→4)
   - Lesson 1 is always unlocked
   - Lesson 2 unlocks when Lesson 1 is completed
   - Lesson 3 unlocks when Lesson 2 is completed
   - Lesson 4 unlocks when Lesson 3 is completed
4. **Show Completion:** Completed lessons show a ✓ checkmark and "Review" button
5. **Cache Offline:** Progress is cached in sessionStorage for offline support

## Frontend Files Modified

- ✅ `frontend/src/contexts/ProgressContext.jsx` - Global progress state
- ✅ `frontend/src/components/ProgressBar.jsx` - Visual progress bar
- ✅ `frontend/src/components/LessonCard.jsx` - Lesson cards with lock states
- ✅ `frontend/src/pages/Home.jsx` - Updated to show progress and locked lessons
- ✅ `frontend/src/pages/Lesson[1-4].jsx` - Updated to use progress context
- ✅ `frontend/src/App.jsx` - Wrapped with ProgressProvider
- ✅ `frontend/src/utils/api.js` - Already has getUserProgress() function
- ✅ `frontend/src/styles/progress.css` - Progress bar styles
- ✅ `frontend/src/styles/lesson-card.css` - Lock/unlock/complete styles

## Data Flow

```
User Logs In
    ↓
Frontend calls GET /api/progress/
    ↓
Backend returns completed lessons [1, 2]
    ↓
Frontend displays:
  - Progress bar: "2/4 lessons - 50%"
  - Lesson 1: ✓ Unlocked, Completed, "Review" button
  - Lesson 2: ✓ Unlocked, Completed, "Review" button
  - Lesson 3: 🔓 Unlocked, Not completed, "Start →" button
  - Lesson 4: 🔒 Locked, "Complete Lesson 3 First" button
    ↓
User completes Lesson 3
    ↓
Frontend calls POST /api/update-progress/ with {lesson_id: 3, score: 100}
    ↓
Frontend refreshes progress (calls GET /api/progress/)
    ↓
Progress bar updates to 75%, Lesson 4 unlocks
```

## Questions?

If you have any questions about the implementation, please ask!

Contact: Your friendly frontend developer
