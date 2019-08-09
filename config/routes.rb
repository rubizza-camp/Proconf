# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  root 'episodes#index'

  resources :episodes, only: %i[index show]

  scope :admin do
    root to: 'dashboard#index'
    resources :episodes
  end
end
