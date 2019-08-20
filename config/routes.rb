# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  root 'episodes#index'

  resources :episodes do
    post  'add_start'
    post  'add_finish'
    resources :announcements
    resources :timecodes, only: [:create]
  end

  get '/admin', to: 'dashboard#index'
  post '/admin/telegram', to: 'dashboard#telegram'

  get '*path', to: redirect('/')
end
