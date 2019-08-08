# frozen_string_literal: true

Rails.application.routes.draw do
  scope :admin do
    root to: 'dashboard#index'
  end

  devise_for :users
  root 'episodes#index'
end
