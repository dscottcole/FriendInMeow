class SessionsController < ApplicationController
    before_action :authenticate!, only: [:show]
    
    def create
        @user = User.find_by(username: params[:username])
        
        if @user && @user.authenticate(params[:password])
            payload = { user_id: @user.id }
            token = JWT.encode(payload, ENV['PWK'],'HS256')
            render json: { 'auth_key': token, 'name': @user.name  }
        else
            render json: { "message": "This username & password combination is invalid. Create an account or try again."}
        end
    end

    def show
        if @user
            render json: { 'user_id': @user.id}
        else
            render json: { "message": "Please log in or create an account." }
        end
    end

end