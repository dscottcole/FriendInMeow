class User < ApplicationRecord

    has_many :cats

    # has_secure_password

    has_secure_password validations: false
    validates :password, {length: {in:6..20}, on: :create}
    validates :password, {length: {in:6..20}, on: :update, if: :password_digest_changed?}
    validates_presence_of :password, on: :create
    validates_confirmation_of :password
    
    validates :username, presence: true
    validates :name, presence: true
    validates :email, presence: true
    validates :username, uniqueness: true, on: [:create, :update]
    # validates :username, uniqueness: true, on: :update

end
