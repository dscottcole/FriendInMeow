class SessionsController < ApplicationController
    
    def create
        @user = User.find_by(username: params[:username])
        
        if @user && @user.authenticate(params[:password])
            payload = { user_id: @user.id }
            token = JWT.encode(payload, ENV['PWK'],'HS256')
            render json: { 'auth_key': token }
        else
            render json: { "message": "This username & password combination is invalid. Create an account or try again."}
        end
    end

end