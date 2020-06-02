from PIL import Image

import os

def batch_resize_folder(dir_path, out_path, height, width, file_ext):
    
    abs_path =  os.path.abspath(dir_path)
    
    print("Current directory")
    print("-----------------")
    print(abs_path+"\n")
    
    
    for dirpath, dnames, fnames in os.walk(dir_path):
        # refactor name
        if dirpath == dir_path:

            for f in fnames:

                image_path = os.path.splitext(f)

                infile = f
                infile_path = os.path.join(dirpath, f)

                outfile = image_path[0]+file_ext
                outfile_path = out_path + image_path[0]
    

                print("Output Path")
                print("-----------------")
                print(outfile)

                print(outfile_path +"\n")
                print(infile_path)
                if infile != outfile:
                    try:
                        print("Coverting Image\n")
                        with Image.open(infile_path) as im:
                            if im.mode in ('RGBA', 'LA'):
                                print("RGBA mode ")
                                new_im = Image.new("RGB", (height, width))
                                new_im.paste(im)

                                new_im.rotate(90) # degrees counter-clockwise
                                new_im.save(outfile_path, "JPEG")

                    except IOError as e:
                        print("cannot convert", infile)
                        print(e)
                        break
                else:
                    # add more information
                    print("Image doesn't need converting\n")
                    im = Image.open(infile)
                    new_im = im.resize((height,width))
                    new_im.rotate(90) # degrees counter-clockwise
                    new_im.save(outfile_path, "JPEG")

                    #except IOError as e:
                    #    print("cannot convert", infile)
                    #    print(e)
                    #    break
                else:
                    # add more information
                    print("Image doesn't need converting\n")
                    im = Image.open(infile)
                    new_im = im.resize((height,width))
                    new_im.rotate(90) # degrees counter-clockwise
                    new_im.save(outfile_path)

batch_resize_folder("./images", "/opt/icons/", 128, 128, ".jpg")

