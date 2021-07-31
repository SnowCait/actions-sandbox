FROM ubuntu:latest

# for tzdata
ENV DEBIAN_FRONTEND=noninteractive

# prepare ubuntu for TexturePacker
RUN apt-get update && \
apt-get install -y libgl1-mesa-glx libglib2.0-0 wget npm git dpkg &&\
rm -rf /var/lib/apt/lists/*

# Copy pre-downloaded TexturePacker.deb package into container
COPY TexturePacker.deb /tmp
RUN /usr/bin/dpkg -i /tmp/TexturePacker.deb

# Uncomment this line if you agree to the license terms
RUN echo agree | TexturePacker --version
