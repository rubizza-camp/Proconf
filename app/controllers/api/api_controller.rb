module Api
  class ApiController < ActionController::API
    include Knock::Authenticable
    undef_method :current_user
  end
end
