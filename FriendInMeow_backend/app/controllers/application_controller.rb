class ApplicationController < ActionController::API

    def current_user
        token = request.headers['Auth-Key']
        begin
          user_id = JWT.decode(token,ENV['PWK'])[0]["user_id"]
          @user = User.all.find_by(id: user_id)
        rescue
          nil
        end
    end
    
    def authenticate!
      unless current_user
        nil
      end
    end

end
