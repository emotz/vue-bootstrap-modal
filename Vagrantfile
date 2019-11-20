Vagrant.configure(2) do |config|
	config.vagrant.plugins = ["vagrant-disksize"]

	config.vm.box = "ubuntu/bionic64"
	config.disksize.size = '30GB'

	config.vm.provider "virtualbox" do |vb|
	  vb.memory = "4096"
	  vb.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/v-root", "1"]
	end

	config.vm.synced_folder ".", "/vagrant"

  config.vm.provision "default-directory", type: "shell", privileged: false, inline: "echo \"\\\n\\\ncd /vagrant\" >> /home/vagrant/.bashrc"
  config.vm.provision "nvm-install", type: "shell", privileged: false, inline: "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.1/install.sh | bash"

	# config.vm.network :forwarded_port, guest: 35729, host: 35729 # live reload
	# config.vm.network :forwarded_port, guest: 9000, host: 9000 # main app
	# config.vm.network :forwarded_port, guest: 9229, host: 9229 # node debug
end
