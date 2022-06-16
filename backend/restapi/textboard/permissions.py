from rest_framework import permissions


class BoardAccessPermission(permissions.BasePermission):
    message = 'Bad request'

    def has_permission(self, request, view):
        return request.method in permissions.SAFE_METHODS
