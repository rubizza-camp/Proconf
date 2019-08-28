class AddPhotoToGuests < ActiveRecord::Migration[5.2]
  def change
    add_column :guests, :photo, :string
  end
end
