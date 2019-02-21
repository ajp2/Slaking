Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :index, :show]
    resource :session, only: [:create, :destroy]
    resources :channels, only: [:create, :index, :update, :destroy]

    resources :user_channels, only: [:create]
    get 'user_channels/find_and_destroy', to: 'user_channels#find_and_destroy'
    
    resources :messages, only: [:create, :index, :update, :destroy]
    resources :emojis, only: [:create, :destroy]
  end

  root to: 'static_pages#root'

  mount ActionCable.server => '/cable'
end
