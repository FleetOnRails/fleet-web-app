set :stage, :development

server 'fleet@app.raven.com',
       user: 'fleet',
       roles: %w{web app db},
       ssh_options: {
           user: 'fleet',
           forward_agent: true,
           auth_methods: %w(password),
           password: '?K?3wKP-asz^BrZ'
       }
