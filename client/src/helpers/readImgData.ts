export default async function readImgData(pfp: HTMLInputElement): Promise<string | undefined> {
  
  const fileReaderPromise: Promise<string | undefined> = new Promise(res => {
    const file = pfp.files![0];

    const reader = new FileReader();
    
    if (file) {
      reader.readAsDataURL(file)

      reader.onload = (e) => {
        res(e.target?.result?.toString())
      };
  
      reader.onerror = (e) => {
        console.log('err', e)
        res(undefined)
      }
    } else {
      res(undefined)
    }
  })


  return fileReaderPromise
}
