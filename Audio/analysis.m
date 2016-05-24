% Loads al recorded audio samples
chromeClean = audioread('chromeClean.wav');
chromeNoise = audioread('chromeNoise.wav');
safariClean = audioread('safariClean.wav');
safariNoise = audioread('safariNoise.wav');

% Initialize constants
fs = 44100;
k = min([length(chromeClean) length(chromeNoise) length(safariClean) length(safariNoise)]);
fsVec = [1:k];
fsVec = fsVec/(2*fs);

% Turns all files to equal lenghts
chromeClean = chromeClean(1:k);
chromeNoise = chromeNoise(1:k);
safariClean = safariClean(1:k);
safariNoise = safariNoise(1:k);
ccfft = fft(chromeClean); cnfft = fft(chromeNoise); scfft = fft(safariClean); snfft = fft(safariNoise);

% Get frequeny response for Chrome and Safari
chromeFreq = cnfft./ccfft;
safariFreq = snfft./scfft;

% PLOT - Image saved as 'browser fingerprint.jpg'
% subplot(2,1,1), plot(fsVec,abs(mag2db(chromeFreq))); xlim([0 1.05]); xlabel('Frequency (xfs)'); title('Noise in Chrome'); 
% subplot(2,1,2), plot(fsVec,abs(mag2db(safariFreq))); xlim([0 1.05]); xlabel('Frequency (xfs)'); title('Noise in Safari');

