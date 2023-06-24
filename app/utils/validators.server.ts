//hard-coded list of personal email providers cause I'm lazy
const personalEmailProviders: string[] = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'aol.com',
  'icloud.com',
  'mail.com',
  'live.com',
  'inbox.com',
  'rocketmail.com',
  'fastmail.com',
  'tutanota.com',
  'rediffmail.com',
  'cox.net',
  'att.net',
  'sbcglobal.net',
  'verizon.net',
  'bellsouth.net',
  'optonline.net',
  'earthlink.net',
  'juno.com',
  'netzero.net',
  'aim.com',
  'lycos.com',
  'ntlworld.com',
  'btinternet.com',
  'virginmedia.com',
  'talktalk.net',
  'sky.com',
  'me.com',
  'mac.com',
  'shaw.ca',
  'telus.net',
  'sympatico.ca',
  'videotron.ca',
  'rogers.com',
  'bellsouth.net',
  'charter.net',
  'comcast.net',
  'cox.net',
  'earthlink.net',
  'netzero.net',
  'sbcglobal.net',
  'verizon.net',
  // Add more personal email providers as needed
];
function isWorkEmail(email: string): boolean {
  const domain: string = email.split('@')[1];
  return !personalEmailProviders.includes(domain);
}

export const validateEmail = (email: string): string | undefined => {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.length || !validRegex.test(email)) {
      return "Please enter a valid email address"
    }

    const isWork: boolean = isWorkEmail(email);
    //TODO:: okay cool, now make sure it's a work email and not just a gmail or yahoo account

    if(!isWork){
      return "Please provide your company email"
    }
  }
  
  export const validatePassword = (password: string): string | undefined => {
    if (password.length < 6) {
      return "Please enter a password that is at least 6 characters long"
    }
  }

  export const validateName = (name: string): string | undefined => {
    if (!name.length) return `Please enter a value`
  }