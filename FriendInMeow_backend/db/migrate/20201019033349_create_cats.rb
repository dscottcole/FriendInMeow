class CreateCats < ActiveRecord::Migration[6.0]
  def change
    create_table :cats do |t|
      t.string :name
      t.string :petfinder_id
      t.integer :user_id

      t.timestamps
    end
  end
end
