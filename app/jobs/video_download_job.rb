class VideoDownloadJob < ApplicationJob
  queue_as :default

  def perform(episode)
    DownloadService.new(episode).create_backup
  end
end
