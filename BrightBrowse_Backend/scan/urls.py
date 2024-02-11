from django.urls import path
from .views import create_scan, start_scan, fetch_scan_result, fetch_past_scan_results, report_pattern, fetch_dark_pattern_types, fetch_sub_dark_pattern_types, add_dark_pattern_type, edit_dark_pattern_type, delete_dark_pattern_type

urlpatterns = [
    path('create/', create_scan, name='create_scan'),
    path('start/', start_scan, name='start_scan'),
    path('result/<str:scan_id>/', fetch_scan_result, name='fetch_scan_result'),

    path('past-results/', fetch_past_scan_results, name='fetch_past_scan_results'),

    path('report/', report_pattern, name='report_pattern'),
    path('dark-pattern-types/', fetch_dark_pattern_types, name='fetch_dark_pattern_types'),
    path('sub-dark-pattern-types/', fetch_sub_dark_pattern_types, name='fetch_sub_dark_pattern_types'),
    path('add-dark-pattern-type/', add_dark_pattern_type, name='add_dark_pattern_type'),
    path('edit-dark-pattern-type/<int:pk>/', edit_dark_pattern_type, name='edit_dark_pattern_type'),
    path('delete-dark-pattern-type/<int:pk>/', delete_dark_pattern_type, name='delete_dark_pattern_type'),
]