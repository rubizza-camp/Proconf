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

  post '/add_start/episode/:id', to: 'episodes#add_start'

  post '/add_finish/episode/:id', to: 'episodes#add_finish'
end
