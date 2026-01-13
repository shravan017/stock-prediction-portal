from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
     #to make password write only
    password = serializers.CharField(
        style={'input_type': 'password'}, 
        write_only=True,
        min_length = 8
    )
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        
    def create(self, validated_data):
        #user = User.objects.create = save the password in plain text
        #but User.objects.create_user = automatically hashed the password 
        
        #user = User.objects.create_user(**validated_data)
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password']
        )
        return user
            