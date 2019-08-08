# frozen_string_literal: true

Rails.application.routes.draw do
  scope :admin do
    resources :dashboard, only: [:index]
  end

  devise_for :users
  root 'episodes#index'
end


