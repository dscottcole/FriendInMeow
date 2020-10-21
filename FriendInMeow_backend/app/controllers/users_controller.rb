class UsersController < ApplicationController

    before_action :authenticate!, only: [:show, :update]

    def create
        @user = User.new(user_params)

        if @user.valid?
            @user.save
            render json: @user.to_json(
                only: [:username, :name, :email]
            )
        else
            error_array = []
            @user.errors.messages.map {|k,v| [(k.to_s), (v)] }.each {|e| error_array.push(e)}
            render json: { "message": error_array }
        end
    end

    def show
        if @user
            render json: @user.to_json(
                except: [:id, :password_digest, :password_confirmation, :created_at, :updated_at]
            )
        else
            render json: { "message": "Please log in or create an account." }
        end
    end
    
    def update
        if @user

            if !params[:user][:password].blank? || !params[:user][:password_confirmation].blank?
                @user.attributes = {:username => params[:user][:username], :name => params[:user][:name], :email => params[:user][:email], :password => params[:user][:password], :password_confirmation => params[:user][:password_confirmation]}
            elsif params[:user][:password].blank? && params[:user][:password_confirmation].blank?
                @user.attributes = {:username => params[:user][:username], :name => params[:user][:name], :email => params[:user][:email]}
            end

            if @user.valid?

                @user.save

                render json: @user.to_json(
                    except: [:id, :password_digest, :password_confirmation, :created_at, :updated_at]
                )
            else
                error_array = []
                @user.errors.messages.map {|k,v| [(k.to_s), (v)] }.each {|e| error_array.push(e)}
                render json: { "message": error_array }
            end

        else
            render json: { "message": "Please log in or create an account." }
        end
    end   

    private

    def user_params
        params.require(:user).permit(:username, :name, :email, :password, :password_confirmation)
    end
    
end
