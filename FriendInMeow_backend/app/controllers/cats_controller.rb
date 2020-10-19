class CatsController < ApplicationController
    before_action :authenticate!, only: [:index, :create, :show, :update, :destroy]
    before_action :cat_params, only: [:create]
    before_action :get_cat, only: [:destroy]

    def index
        if @user
            @cats = Cat.all.select {|cat| cat.user_id == @user.id}
            render json: @cats.as_json(only: [:id, :petfinder_id, :user_id])
        else 
            render json: {"message": "Please log in."}
        end
    end

    def create
        if @user
            @cat = Cat.new(name: cat_params['name'], petfinder_id: cat_params['petfinder_id'], user_id: @user.id)

            if @cat.valid?
                @cat.save
                render json: @cat.as_json(only: [:id])
            else
                render json: {"message": "Cat is already in your favorites.", errors: @cat.errors }
            end
            
        else 
            render json: {"message": "Please log in or create an account to save this cat to favorites." }
        end
    end

    def destroy
        if @user

            @cat.destroy
            render json: {"message": "This cat is no longer in your favorites."}
        else
            render json: {"message": "Please log in or create an account to remove this cat from favorites." }
        end
    end

    private

    def get_cat
        @cat = Cat.all.find_by(id: params[:id])
    end
    
    def cat_params
        params.require(:cat).permit(:name, :petfinder_id)
    end

end
