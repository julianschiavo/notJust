## search.py

import random
from imagesoup import ImageSoup
soup = ImageSoup()


def search_google_images(query):
    return soup.search('"' + query + '"', n_images=300)

#Read data from stdin
def read_in():
    lines = sys.stdin.readlines()
    #Since our input would only be having one line, parse our JSON data from that
    return lines[0]

def main():
    #get our data as an array from read_in()
    lines = read_in()
    
    result = search_google_images(lines)
    choice = random.choice(result)
    #r = requests.get(choice.URL)
    #r.raise_for_status()
    #event.msg.reply('', attachments=[('img.jpg', r.content)])

    #return the sum to the output stream
    print choice.URL

#start process
if __name__ == '__main__':
    main()
