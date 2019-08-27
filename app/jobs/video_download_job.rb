class VideoDownloadJob < ApplicationJob
  queue_as :default

  def perform(episode)
    path = DownloadService.new(episode).download
    episode.backup_video.attach(io: File.open(path),
                                filename: "#{episode.title}.mp4")
    File.delete(path) if File.exist?(path)
  end
end
