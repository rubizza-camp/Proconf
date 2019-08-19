class TimecodesController < ApplicationController
  before_action :set_timecode, only: %i[edit update show destroy send_timecode]
  before_action :set_episode, only: %i[index new create]

  load_and_authorize_resource

  def index; end

  def show; end

  def new
    @timecode = @episode.timecodes.new
  end

  def create
    timecode = @episode.timecodes.create(timecode_params)

    if timecode.valid?
      redirect_to episode_timecodes_path
    else
      redirect_to new_episode_timecode_path
    end
  end

  def edit; end

  def update
    if @timecode.update(timecode_params)
      redirect_to episode_timecodes_path
    else
      redirect_to edit_episode_timecode_path
    end
  end

  def destroy
    @timecode.delete

    redirect_to episode_timecodes_path
  end

  private

  def timecode_param_names
    %i[title time]
  end

  def timecode_params
    params.require(:timecode).permit(timecode_param_names)
  end

  def set_timecode
    @timecode = Timecode.find(params[:id])
  end

  def set_episode
    @episode = Episode.find(params['episode_id'])
  end
end
