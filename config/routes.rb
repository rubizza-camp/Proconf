# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  root 'episodes#index'

  resources :episodes do
    resources :announcements
    resources :timecodes, only: [:create]
  end

  get '/admin', to: 'dashboard#index'
  post '/admin/telegram', to: 'dashboard#telegram'

  get '*path', to: redirect('/')

  post '/update_youtube_info/:id', to: 'episodes#update_youtube_info'

  post '/add_start/:id', to: 'episodes#add_start'

  post '/add_finish/:id', to: 'episodes#add_finish'
end
