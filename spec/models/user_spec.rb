require 'rails_helper'

RSpec.describe User, type: :model do
  subject { described_class.new }

  it 'is not valid without role id' do
    expect(subject).to_not be_valid
  end
end
