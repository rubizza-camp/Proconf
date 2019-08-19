module TimeCodesHelper
  YOUTUBE_LINK = 'https://www.youtube.com/watch?v='.freeze
  def time_link(timecode)
    YOUTUBE_LINK + @episode.video +
      "&t=#{(timecode.time - @episode.broadcast_begin).truncate + ENV['YOUTUBE_DELAY'].to_i}s"
  end
end
