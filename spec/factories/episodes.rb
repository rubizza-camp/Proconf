FactoryBot.define do
  title_array = %w[Title_1 Title_2 Title_3]
  video_array = %w[vpiQXXBma10 IAO5bPs0x58 eDSOq2gBckU]
  
  factory :episode do
    title { title_array.sample }
    date { Time.now.utc }
    video { video_array.sample }
  end
end
