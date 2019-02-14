Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :index, :show]
    resource :session, only: [:create, :destroy]
    resources :channels, only: [:create, :index, :update, :destroy] do
      resources :user_channels, only: [:destroy]
    end
    resources :user_channels, only: [:create]
    resources :messages, only: [:create, :index, :update, :destroy]
  end

  root to: 'static_pages#root'

  mount ActionCable.server => '/cable'
end
