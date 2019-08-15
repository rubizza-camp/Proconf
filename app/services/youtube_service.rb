class YoutubeService
  def initialize(episode)
    @episode = episode
    @video = Yt::Video.new id: episode.video
    Yt.configuration.api_key =  ENV['TEST_CHANNELKEY']
  end

  def get_start
    @video.actual_start_time
  end

  def get_end
    @video.actual_end_time
  end

  def get_status
    @video.live_broadcast_content
  end

  def save_all
    @episode.broadcast_begin = get_start
    @episode.broadcast_end = get_end
    @episode.youtube_status = get_status
    @episode.youtube_status = 'over' if get_status == 'none'
    @episode.save!
  end

end
