class Admin::ApplicationController < ApplicationController
  layout 'admin'

  def index
    render 'admin/index'
  end
end
