# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  root 'episodes#index'

  namespace :api do
    namespace :v1 do
      post 'user_token' => 'user_token#create'
      get '/participants', to: 'participants#receive_all_participants'
      resources :episodes, only: %i[index show create update destroy] do
        post 'add_finish', on: :member
        post 'add_start', on: :member
        post 'update_youtube_data', on: :member
        post 'to_announcement', on: :member
        post 'to_online', on: :member
        post 'to_finished', on: :member
        resources :announcements, only: %i[index show create update destroy] do
          post '/send', to: 'announcements#send_announcement'
        end
        resources :timecodes, only: %i[index show create update destroy]
      end
      get '/webhooks/receive', to: 'webhooks#complete'
      post '/webhooks/receive', to: 'webhooks#receive'
      delete '/webhooks/delete', to: 'webhooks#delete'
      post '/webhooks/create', to: 'webhooks#create'
      get '/users_boards', to: 'webhooks#users_boards'
      get '/telegram', to: 'telegram#credentials'
      post '/telegram', to: 'telegram#telegram'
    end
  end

  get '/auth/trello/callback', to: 'trello#trello'
  match '/admin/*path', to: 'dashboard#index', via: :all
  get '/admin', to: 'dashboard#index'

  match '/episodes/*path', to: 'episodes#index', via: :all

  get '*path', to: redirect('/')
end
