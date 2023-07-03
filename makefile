# get git config
config:
	git config -l

# get git log
CareConnect.log.txt:
	git log > CareConnect.log.txt

# run the frontend with docker
run-frontend:
	docker run -d -p 3000:3000 careconnect-frontend

# build docker image for front end
build-frontend:
	docker build -t careconnect-frontend my-app/

# run the backend with docker
run-backend:
	docker run --rm -it -p 5000:5000 careconnect-backend

# build docker image for backend end
build-backend:
	docker build -t careconnect-backend back-end/

# get git status
status:
	make clean
	@echo
	git branch
	git remote -v
	git status

# download files from the repo
pull:
	@echo
	git pull
	git status
