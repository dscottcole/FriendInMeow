class CatsController < ApplicationController
    before_action :authenticate!, only: [:index, :create, :show, :update, :destroy]
    before_action :cat_params, only: [:create, :destroy]

    def index

        if @user
            @cats = Cat.all.select {|cat| cat.user_id == @user.id}
            render json: @cats.as_json(only: [:id, :petfinder_id, :user_id])
        else 
            render json: {"message": "Please log in."}
        end
    end

    def create

        @cat = Cat.new(name: cat_params['name'], petfinder_id: cat_params['petfinder_id'], user_id: @user.id)

        if @cat.valid?
            @cat.save
            render json: @cat.as_json(only: [:id, :user_id])
        else
            byebug
            render json: {"message": "Cat is already in your favorites.", errors: @cat.errors }
        end
    end

    private
    
    def cat_params
        params.require(:cat).permit(:name, :petfinder_id)
    end

end
