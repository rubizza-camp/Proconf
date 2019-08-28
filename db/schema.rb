# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_08_27_145628) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "announcements", force: :cascade do |t|
    t.bigint "episode_id"
    t.string "title", null: false
    t.datetime "date", null: false
    t.string "image"
    t.string "video"
    t.string "target_resource", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["episode_id"], name: "index_announcements_on_episode_id"
  end

  create_table "authors", force: :cascade do |t|
    t.string "name", null: false
    t.string "surname", null: false
    t.text "bio"
    t.string "photo"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "authors_episodes", id: false, force: :cascade do |t|
    t.bigint "episode_id"
    t.bigint "author_id"
    t.index ["author_id"], name: "index_authors_episodes_on_author_id"
    t.index ["episode_id"], name: "index_authors_episodes_on_episode_id"
  end

  create_table "credentials", force: :cascade do |t|
    t.bigint "user_id"
    t.string "service"
    t.json "data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_credentials_on_user_id"
  end

  create_table "episodes", force: :cascade do |t|
    t.string "title", null: false
    t.string "video"
    t.string "image"
    t.datetime "date"
    t.string "soundcloud"
    t.text "description"
    t.string "status", default: "draft", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "created_by"
    t.string "youtube_status"
    t.datetime "broadcast_begin"
    t.datetime "broadcast_end"
    t.datetime "actual_start"
    t.datetime "actual_finish"
    t.string "conference_link"
    t.index ["created_by"], name: "index_episodes_on_created_by"
  end

  create_table "episodes_guests", id: false, force: :cascade do |t|
    t.bigint "guest_id", null: false
    t.bigint "episode_id", null: false
  end

  create_table "episodes_sponsors", id: false, force: :cascade do |t|
    t.bigint "sponsor_id", null: false
    t.bigint "episode_id", null: false
  end

  create_table "guests", force: :cascade do |t|
    t.string "name"
    t.string "surname"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "roles", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sponsors", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "timecodes", force: :cascade do |t|
    t.bigint "episode_id"
    t.string "title", null: false
    t.datetime "time", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["episode_id"], name: "index_timecodes_on_episode_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.bigint "role_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["role_id"], name: "index_users_on_role_id"
  end

  add_foreign_key "announcements", "episodes"
  add_foreign_key "authors_episodes", "authors"
  add_foreign_key "authors_episodes", "episodes"
  add_foreign_key "credentials", "users"
  add_foreign_key "episodes", "users", column: "created_by"
  add_foreign_key "timecodes", "episodes"
  add_foreign_key "users", "roles"
end
