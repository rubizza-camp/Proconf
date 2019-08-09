class AnnouncementController < ApplicationController
  def index
    @announcements = Announcement.all
  end

  def show
    @announcement = Announcement.find(params[:id])
  end

  def new
    # create method
  end

  def edit
    @announcement = Announcement.find(params[:id])
  end

  def update
    # update method
  end
end
