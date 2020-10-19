class Cat < ApplicationRecord
    belongs_to :user

    validates :petfinder_id, uniqueness: {scope: :user}

end
