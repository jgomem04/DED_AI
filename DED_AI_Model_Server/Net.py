import torch
import torch.nn as nn
import segmentation_models_pytorch as smp


class Net(nn.Module):
  def __init__(self):
    super().__init__()
    self.unet = smp.UnetPlusPlus(classes=2)
    self.fc1 = nn.Linear(2 * 256 * 256, 2)

  def forward(self, x):
    unet_output = self.unet(x)
    unet_output = unet_output.contiguous()

    conv_flat = unet_output.view(-1, 2 * 256 * 256)
    out = self.fc1(conv_flat)

    return out