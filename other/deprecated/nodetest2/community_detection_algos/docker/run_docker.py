import os

if __name__ == '__main__':
    mount_dir_path = os.path.abspath(os.pardir)
    print mount_dir_path
    os.system('docker run  -v ' + mount_dir_path + ':/opt yche/yche-dev-env /bin/bash -c "cd /opt/; '
                                                   'mkdir -p build; cd build; cmake ../src; make;"')
