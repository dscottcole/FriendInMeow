class UsersController < ApplicationController

    before_action :get_user, only: [:show]


    def create
        @user = User.new(user_params)

        if @user.valid?
            @user.save
            render json: @user.to_json(
                only: [:username, :name, :email]
            )
        else
            error_array = []
            @user.errors.messages.map {|k,v| [(k.to_s + " "), v] }.each {|e| error_array.push(e)}
            render json: { "message": error_array }
        end
    end

    def show
        render json: @user.to_json(
            except: [:id, :password_digest, :password_cofirmation, :created_at, :updated_at]
        )
    end       

    private

    def get_user
        @user = User.all.find_by(id: params[:id])
    end

    def user_params
        params.require(:user).permit(:username, :name, :email, :password, :password_confirmation)
    end
    
end
