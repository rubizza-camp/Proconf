class YoutubeService
  def initialize(episode)
    @episode = episode
    @video = Yt::Video.new id: episode.video
    Yt.configuration.api_key = ENV['TEST_CHANNELKEY']
  end

  def broadcast_start_date
    @video.actual_start_time
  end

  def broadcast_end_date
    @video.actual_end_time
  end

  def youtube_status
    @video.live_broadcast_content == 'none' ? 'over' : @video.live_broadcast_content
  end

  def save_all
    @episode.broadcast_begin = broadcast_start_date
    @episode.broadcast_end = broadcast_end_date
    @episode.youtube_status = youtube_status
    @episode.save!
  end
end
