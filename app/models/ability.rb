# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    can :read, Episode if user && user.role.name == 'admins'
  end
end
