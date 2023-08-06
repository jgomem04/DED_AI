from flask import Flask, request, jsonify
from torchvision import transforms
from PIL import Image
from Net import Net
from io import BytesIO
import numpy as np
import base64
import torch
import cv2

app = Flask(__name__)
model = Net()
model.load_state_dict(torch.load("Model.pt", map_location=torch.device('cpu')))
model.eval()

def preprocess_img(img):
    blurred_layer = cv2.GaussianBlur(img, (0,0), 10)
    meancolor_removed = cv2.addWeighted(img, 4, blurred_layer, -4, 128)

    resized_img = cv2.resize(meancolor_removed, (256, 256), interpolation=cv2.INTER_AREA)

    final_img = resized_img.astype("float32")
    final_img = np.transpose(final_img, (2,0,1))

    tensor_img = torch.from_numpy(final_img)

    return tensor_img

def run_inference(input_tensor):
    with torch.no_grad():
        out_tensor = model(input_tensor.unsqueeze(0))
    
    _,result = torch.max(out_tensor, dim=1)

    return result.item()

def transform_image(b64):
    im_bytes = base64.b64decode(b64)
    img_decoded = Image.open(BytesIO(im_bytes))

    img_np = np.array(img_decoded)
    img_uint8 = img_np.astype(np.uint8)

    return img_uint8

@app.route("/predict", methods=["POST"])
def predict():
    prediction = False

    data = request.json
    b64 = data.get("pic")

    transformed = transform_image(b64)
    processed = preprocess_img(transformed)
    
    if run_inference(processed) == 1:
        prediction = True

    return jsonify(result=prediction)