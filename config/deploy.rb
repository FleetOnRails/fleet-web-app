set :application, 'fleet-web-app'
set :stages, %w(production development)
set :default_stage, 'development'

set :deploy_to, '/home/fleet/web_app/'
set :tmp_dir, '/home/fleet/web_app/tmp'

set :scm, :git
set :branch, 'development'
set :repo_url, 'git@git.raven.com:fleetonrails/fleet-web-app.git'

set :keep_releases, 5

namespace :deploy do

  desc 'Restart application'
  task :restart do
    on roles(:app), in: :sequence, wait: 5 do

    end
  end

  after :restart, :clear_cache do
    on roles(:web), in: :groups, limit: 3, wait: 10 do

    end
  end

  after :finishing, 'deploy:cleanup'
end
