# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  root 'episodes#index'

  resources :episodes do
    resources :announcements
  end

  get '/admin', to: 'dashboard#index'
  post '/admin/telegram', to: 'dashboard#telegram'
  get '*path', to: redirect('/')

  post '/update_youtube/:id', to: 'episodes#update_youtube'
end
