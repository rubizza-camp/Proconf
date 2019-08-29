# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  root 'episodes#index'

  namespace :api do
    namespace :v1 do
      get '/participants', to: 'participants#receive_all_participants'
      resources :episodes, only: %i[index show create update destroy update_youtube_info]
    end
  end

  resources :episodes do
    get 'download'
    post  'add_start', on: :member
    post  'add_finish', on: :member
    post 'update_youtube_data', on: :member
    resources :announcements
    post '/to_announcement', to: 'episodes#announce', on: :member
    resources :timecodes
  end

  get '/admin', to: 'dashboard#index'
  match '*path', to: 'dashboard#index', via: :all

  post '/admin/telegram', to: 'dashboard#telegram'

  get '*path', to: redirect('/')
end
